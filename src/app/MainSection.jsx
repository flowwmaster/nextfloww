import React from "react";
import Paralax from "src/components/Paralax";

function mainSection() {
  return (
    <div>
      <section>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:texxt-6xl ">
            Your marketplace for high quality
            <span className="text-blue-600"> business soutions</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to BizFloww. Every asset on our platform is verified by our
            team to ensure our highest quality standards.
          </p>
        </div>
      </section>
      <section>
        <Paralax />
      </section>
      <section>3rd</section>
      <section>4th</section>
    </div>
  );
}

export default mainSection;
