import {cva} from "class-variance-authority"

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-[#4d58ff] text-white shadow-sm hover:bg-[#4d58ff]/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-brand-teal text-white shadow-sm hover:bg-brand-teal/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-brand-purple underline-offset-4 hover:underline",
                accent: "bg-brand-gold text-white shadow-sm hover:bg-brand-gold/90",
                success: "bg-blinkly-green text-white shadow-sm hover:bg-blinkly-green-dark",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
                xl: "h-12 rounded-md px-10 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)
