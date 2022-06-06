import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {

}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}