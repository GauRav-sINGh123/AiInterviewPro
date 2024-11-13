import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
 
 
const sql = neon("postgresql://InterviewAiPro_owner:14lBygSOAqRP@ep-polished-darkness-a5ucmulq.us-east-2.aws.neon.tech/InterviewAiPro?sslmode=require");
export const db = drizzle(sql, { schema });