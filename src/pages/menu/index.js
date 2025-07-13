import MenuPage from "../../../components/templates/MenuPage";

const BASE_URL = "https://test-server-seven-zeta.vercel.app";

function Menu({ data }) {
  return (
    <div>
      <MenuPage data={data} />
    </div>
  );
}

export default Menu;

export async function getStaticProps() {
  try {
    const res = await fetch(`${BASE_URL}/data`);
    const data = await res.json();

    return {
      props: { data },
      revalidate: 3600, // seconds
    };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return {
      props: { data: [] },
      revalidate: 3600,
    };
  }
}