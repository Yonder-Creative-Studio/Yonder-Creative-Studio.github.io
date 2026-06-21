"use server";

export async function VerifyAdminKey(inputKey: string): Promise<boolean> {
    
    return (
        inputKey === process.env.ADMIN_KEY
  )
}
