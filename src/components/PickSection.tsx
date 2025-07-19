"use client";

import Image from "next/image";

const PickSection = () => {
  return (
    <section className="py-20 bg-background space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Control Garantizado
          </h2>
          <p className="text-muted-foreground text-lg">
            Las Mejores Herramientas Para Apostadores y Tipsters
          </p>
        </div>

        {/* Desktop Table */}
        <div
          style={{
            filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
          }}
        >
          <Image
            src="/images/user.png"
            alt="User Dashboard"
            className="h-auto rounded-3xl object-cover"
            width={1200}
            height={800}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Control Garantizado
          </h2>
          <p className="text-muted-foreground text-lg">
            Las Mejores Herramientas Para Apostadores y Tipsters
          </p>
        </div>

        {/* Desktop Table */}
        <div
          style={{
            filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
          }}
        >
          <Image
            src="/images/tipster.png"
            alt="User Dashboard"
            className="h-auto rounded-3xl object-cover"
            width={1200}
            height={800}
          />
        </div>
      </div>
    </section>
  );
};

export default PickSection;
