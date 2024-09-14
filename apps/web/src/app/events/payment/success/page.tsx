import Image from "next/image";

export default function SuccessPage() {
    return(
        <div className="flex items-center justify-center p-8 h-screen w-screen">
            <div className="text-center flex flex-col items-center justify-center">
            <Image src="/successbutton.png" alt="success" height={300} width={300}/>
            <h1 className="text-lg font-bold">Success!</h1>
            <p className="text-md font-medium">Your form has been submitted successfully.</p>
            </div>
        </div>
    )
}

