import React from "react";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function Resume1({ data }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-1">{data.info.firstName.toUpperCase()} {data.info.lastName.toUpperCase()}</h1>
        <p className="text-sm text-gray-600">{data.info.title}</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/5">
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4">DETAILS</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-sm">{data.info.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm">{data.info.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm">{data.info.email}</p>
              </div>
            </div>
          </section>

          {data.info.socials.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4">LINKS</h2>
              <div className="space-y-2">
                {data.info.socials.map((social) => (
                  <p key={social.id} className="text-sm">
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {social.label}
                    </a>
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-full md:w-3/5">
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4">{data.profile.title.toUpperCase()}</h2>
            <p className="text-sm">{data.profile.text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4">{data.experience.title.toUpperCase()}</h2>
            {data.experience.jobs.map((job) => (
              <div key={job.id} className="mb-6">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}, {job.city}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDate(job.startDate)} - {job.isCurrent ? "Present" : formatDate(job.endDate)}
                </p>
                <p className="text-sm mb-2">{job.responsibilities}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
