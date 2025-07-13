import MenuPage from "../../../components/templates/MenuPage";

function Menu({ data }) {
  return (
    <div>
      <MenuPage data={data} />
    </div>
  );
}

export default Menu;

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: +process.env.REVALIDATE, //seconds
  };
}
