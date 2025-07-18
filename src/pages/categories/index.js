import CategoriesPage from "../../../components/templates/CategoriesPage";

const BASE_URL = "https://test-server-seven-zeta.vercel.app";


function Categories({ data }) {
  return <CategoriesPage data={data} />;
}

export default Categories;

//روش اول

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;

  const res = await fetch(`${BASE_URL}/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty
    );

    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"] || "";
      const [timeDetail] = cookingTime.split(" ");
      if (time === "less" && timeDetail && +timeDetail <= 30) {
        return detail;
      } else if (time === "more" && +timeDetail > 30) {
        return detail;
      }
    });
    if (time && difficulty && timeResult.length && difficultyResult.length) {
      return item;
    } else if (!time && difficulty && difficultyResult.length) {
      return item;
    } else if (time && !difficulty && timeResult.length) {
      return item;
    }
  });
  return {
    props: { data: filteredData },
  };
}


//روش دوم
// export async function getServerSideProps({ query }) {
//   const { difficulty, time } = query;

//   const res = await fetch(`${BASE_URL}/data`);
//   const data = await res.json();

//   const filteredData = data.filter((item) => {
//     const details = Object.assign({}, ...item.details);

//     const matchDifficulty = difficulty
//       ? details.Difficulty === difficulty
//       : true;

//     const matchTime = time
//       ? (() => {
//           const cookTime = parseInt(details["Cooking Time"]) || 0;
//           return time === "less" ? cookTime <= 30 : cookTime > 30;
//         })()
//       : true;

//     return matchDifficulty && matchTime;
//   });

//   return {
//     props: { data: filteredData },
//   };
// }
