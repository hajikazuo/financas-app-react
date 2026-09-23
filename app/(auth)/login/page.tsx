import Link from "next/link";
import { login } from "./actions";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    return (
        <form action={login}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Insira seu e-mail abaixo para acessar sua conta.
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link href="/cadastro">Criar uma conta</Link>
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>

                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@exemplo.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}