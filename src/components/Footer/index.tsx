import Layout from "../Layout";
import Image from "next/image";
import Link from "next/link";
import iconWater from "../../../public/icon-water.png"

const Footer = () => {
    return (
        <div className="bg-background-primary/5">
            <Layout flex={true}>
                <div className="flex md:gap-3 flex-wrap justify-center w-full lg:w-auto">
                    <Image src={iconWater} alt="Icone de água" width={20} height={20} />
                    <p className="text-text-primary text-sm text-center">SOS Enchentes — uma plataforma comunitária de emergência.</p>
                </div>
                <div className="flex flex-wrap justify-center mt-4 md:gap-6 lg:mt-0 w-full lg:w-auto">
                    <p className="text-text-primary text-sm">Feito com 💙 para quem precisa.</p>
                    <Link href={"/voluntarios"} className="text-background-primary text-sm font-medium">Seja voluntário</Link>
                </div>
            </Layout>
        </div>
    )
}

export default Footer;