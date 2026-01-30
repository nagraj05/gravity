import Header from "@/components/gravity-components/Header";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}