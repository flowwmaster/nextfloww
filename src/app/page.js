import "./app.scss";
import MainSection from "./MainSection";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Paralax from "@/components/Paralax";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div>
      <MainSection session={session} />
      {/* <section>
        <Paralax />
      </section>
      <section>3rd</section>
      <section>4th</section> */}
    </div>
  );
}
