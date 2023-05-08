export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            Copyright ⓒ {currentYear}
        </footer>
    );
}