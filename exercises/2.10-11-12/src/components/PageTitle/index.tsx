
interface PageTitleProps {
  title: string;
} 

const PageTitle = (props: PageTitleProps) => <h1>{props.title}</h1>;

export default PageTitle;