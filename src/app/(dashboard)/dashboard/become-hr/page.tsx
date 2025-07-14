"use client";

import {Step, StepLabel, Stepper} from "@mui/material";
import {useEffect, useState} from "react";
import {Button} from "@/components/dashboard/ui/button";
import HrHeroImage from "../../../../../public/images/hr/hr-hero-img.png";
import Image from "next/image";
import {Input} from "@/components/dashboard/ui/input";
import {Textarea} from "@/components/dashboard/ui/textarea";
import {z} from "zod";

const steps = ['Information', 'Enter your details', 'Chat with us'];

const BecomeHrZodSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    desc: z.string().min(1, "Description is required"),
})

const BecomeHrPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [companyName, setCompanyName] = useState<string>("");
    const [desc, setDesc] = useState<string>("")
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    useEffect(() => {
        const result = BecomeHrZodSchema.safeParse({
            companyName,
            desc
        })

        if (!result.success) {
            const errs: { [k: string]: string } = {};
            result.error.issues.forEach(issue => {
                if (issue.path.length > 0)
                    errs[issue.path[0] as string] = issue.message;
            })
            setErrors(errs);
            return;
        } else
            setErrors({});
    }, [companyName, desc]);

    const handleNext = () => {
        if (activeStep === steps.length)
            return

        if (activeStep === 1) {
            const result = BecomeHrZodSchema.safeParse({
                companyName: companyName.trim(),
                desc: desc.trim()
            })

            if (!result.success) {
                const errs: { [k: string]: string } = {};
                result.error.issues.forEach(issue => {
                    if (issue.path.length > 0)
                        errs[issue.path[0] as string] = issue.message;
                })
                setCompanyName(companyName.trim());
                setDesc(desc.trim());
                setErrors(errs);
                return;
            } else
                setErrors({});
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <section>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div className={"hr-chat-body h-[73vh] overflow-y-scroll scrollbar-hide my-2 p-4"}>
                {activeStep === 0 &&
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">

                        {/* Left Image */}
                        <Image
                            className="object-cover w-full h-auto rounded-2xl shadow-md"
                            src={HrHeroImage}
                            alt="HR Hero Image"
                        />

                        {/* Right Text */}
                        <div className="text-center md:text-left space-y-4">
                            <h2 className="text-2xl font-semibold text-blue-600 tracking-wide">
                                Where does it come from?
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                Contrary to popular belief, Lorem Ipsum is not simply random text.
                                It has roots in a piece of classical Latin literature from 45 BC,
                                making it over 2000 years old. Richard McClintock, a Latin professor
                                at Hampden-Sydney College in Virginia, looked up one of the more obscure
                                Latin words, <em>consectetur</em>, from a Lorem Ipsum passage, and going
                                through the cites.
                            </p>
                        </div>
                    </div>
                }
                {activeStep === 1 && <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                    {/* Left Image */}
                    <Image
                        className="object-cover w-full h-auto rounded-2xl shadow-md"
                        src={HrHeroImage}
                        alt="HR Hero Image"
                    />
                    {/* Right Text */}
                    <div className="text-center md:text-left space-y-4">
                        <div>
                            <Input
                                value={companyName}
                                className={"mb-1"}
                                onChange={e => setCompanyName(e.target.value)}
                                placeholder={"Enter your company name"}/>
                            {errors.companyName && <p className="text-red-600 text-sm">{errors.companyName}</p>}
                        </div>
                        <div>
                            <Textarea
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                rows={16} maxLength={1000} className={"resize-none mb-1"}
                                placeholder={"Enter about your company"}/>
                            {errors.desc && <p className="text-red-600 text-sm">{errors.desc}</p>}
                        </div>
                    </div>
                </div>}
                {activeStep === 2 && <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                    {/* Left Inputs */}
                    <div className="text-center md:text-left space-y-4">
                        <Input
                            value={companyName}
                            disabled={true}
                            onChange={e => setCompanyName(e.target.value)}
                            placeholder={"Enter your company name"}/>
                        <Textarea
                            value={desc}
                            disabled={true}
                            onChange={e => setDesc(e.target.value)}
                            rows={16} maxLength={1000} className={"resize-none"}
                            placeholder={"Enter about your company"}/>
                    </div>
                    {/* Right Chat content */}
                    <div>
                        Chat
                    </div>
                </div>}
            </div>
            <div className={"flex items-center gap-3 justify-end"}>
                <Button
                    variant="outline"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                {activeStep !== steps.length - 1 && (
                    <Button variant={"outline"}
                            className={"bg-[#2563EB] text-[#fff] hover:bg-[#3b82f6] transition-all duration-300"}
                            onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                )}
            </div>
        </section>
    )
}

export default BecomeHrPage;