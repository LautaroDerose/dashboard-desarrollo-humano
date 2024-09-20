"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getRecipientsAndBenefits() {
  const recipients = await prisma.recipient.findMany({ where: { is_active: true, } });
  const benefits = await prisma.benefit.findMany({ where: { is_active: true, } });
  return { recipients, benefits };
}