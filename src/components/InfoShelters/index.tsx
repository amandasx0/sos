type InfoSheltersType = {
    capacidadeTotal: number
    vagasOcupadas: number
    vagasLivres: number
}

const InfoShelters = ({capacidadeTotal, vagasOcupadas, vagasLivres} : InfoSheltersType) => {
    return (
         <div className="bg-linear-to-b from-blue-100 via-blue-50 to-blue-100 rounded-2xl py-4 px-4 lg:px-8 flex justify-between">
        <div>
          <p className="text-xs lg:text-sm text-text-primary font-bold uppercase">Capacidade</p>
          <span className="text-2xl lg:text-4xl text-[#0b2c65] font-extrabold">{capacidadeTotal}</span>
        </div>
         <div>
          <p className="text-xs lg:text-sm text-text-primary font-bold uppercase">Ocupados</p>
          <span className="text-2xl lg:text-4xl text-[#f98806] font-extrabold">{vagasOcupadas}</span>
        </div>
         <div>
          <p className="text-xs lg:text-sm text-text-primary font-bold uppercase">Disponíveis</p>
          <span className="text-2xl lg:text-4xl text-[#22a065] font-extrabold">{vagasLivres}</span>
        </div>
      </div>
    )
}

export default InfoShelters