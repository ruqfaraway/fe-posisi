const RedirectEmpty = () => {
  return <></>;
};
export default RedirectEmpty;
export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
};
