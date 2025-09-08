const LoadingAnimation = ({ title }: { title: string }) => {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">{title}…</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        </div>
    </div>
}

export default LoadingAnimation;