import { useRouter } from "next/router";
import DetailsPage from "../../../components/templates/DetailsPage";

const BASE_URL = "https://test-server-seven-zeta.vercel.app";

function Details({ data }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading ...</h2>;
  }
  return <DetailsPage {...data} />;
}

export default Details;

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/data`);
  const json = await res.json();
  const data = json.slice(0, 10);
  
  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }));
  
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  
  const res = await fetch(`${BASE_URL}/data/${id}`);
  const data = await res.json();
  
  if (!data.id) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: { data },
    revalidate: 3600,
  };
}