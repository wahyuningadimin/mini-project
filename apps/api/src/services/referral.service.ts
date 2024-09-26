import { generateRandomNumber } from "@/utils/number-generator.util";


export const generateReferralCode = (fullName: string): string => {
    const fullNameUppercase = fullName.split(" ")[0].toUpperCase();

    return fullNameUppercase + generateRandomNumber();
}