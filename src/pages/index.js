const RedirectPages = () => {
  return <></>;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
