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
            <div className="bg-blue-900 p-4 h-96">
              {/* Coluna 1 */}
            </div>

            {/* Segunda coluna */}
            <div className="bg-gray-800 p-4 flex flex-col items-center space-y-4">
              <span className="text-4xl font-bold mb-4">Avisos</span>
              <div className="flex w-full">
                <span className="text-2xl">Altura atual: 4.6m</span>
                {/* <span className="border-b border-gray-400 flex-grow mx-2"></span> */}
                {/* <span>3.5m</span> */}
              </div>
              <div className="flex w-full">
                <span className="text-2xl">Previsão de chuva: 0mm</span>
                {/* <span className="border-b border-gray-400 flex-grow mx-2"></span> */}
                {/* <span>Baixo</span> */}
              </div>
              <div className="flex w-full">
                <span className="text-2xl">Perigo: Baixo</span>
                {/* <span className="border-b border-gray-400 flex-grow mx-2"></span> */}
                {/* <span>Baixo</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Primeira coluna */}
            <div className="bg-gray-800 p-4 flex flex-col items-center space-y-4">
              <span className="text-4xl font-bold mb-4">Últimas inundações</span>
              <div className="flex justify-between w-full">
                <span>13/05/24</span>
                <span className="border-b border-gray-400 flex-grow mx-2"></span>
                <span>27.5mm</span>
              </div>
            </div>

            {/* Segunda coluna */}
            <div className="bg-gray-800 p-4 flex flex-col items-center space-y-4">
              <span className="text-4xl font-bold mb-4">Últimas medições</span>
              <div className="flex justify-between w-full">
                <span>Hora:</span>
                <span className="border-b border-gray-400 flex-grow mx-2"></span>
                <span>3.5m</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Dia:</span>
                <span className="border-b border-gray-400 flex-grow mx-2"></span>
                <span>5.2m</span>
              </div>
              <div className="flex justify-between w-full">
                <span>7 dias:</span>
                <span className="border-b border-gray-400 flex-grow mx-2"></span>
                <span>4.4m</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Mês:</span>
                <span className="border-b border-gray-400 flex-grow mx-2"></span>
                <span>3.4m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
