const Footer = (): JSX.Element => {
  return (
    <footer className='fixed-bottom text-light py-1 px-1'>mode:{JSON.stringify(import.meta.env.MODE)}</footer>
  );
};

export default Footer;
