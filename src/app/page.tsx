import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10" style={{ gap: '20px' }}>
      <Image 
        alt="logo"
        src="/logo_hor.svg"
        width={300}
        height={24}
        priority
      />

      <div className="w-full px-4">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Primeira coluna */}
            <div className="bg-gray-800 p-4">
              Coluna 1
            </div>

            {/* Segunda coluna */}
            <div className="bg-gray-800 p-4">
              Coluna 2
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


