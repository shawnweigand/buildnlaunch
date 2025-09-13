import { Head, Link } from '@inertiajs/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

export default function CheckoutSuccess() {
    return (
        <>
            <Head title="Payment Successful" />
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-md">
                    <Card className="text-center">
                        <CardHeader className="pb-4">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-foreground">
                                Payment Successful!
                            </CardTitle>
                            <CardDescription className="text-base">
                                Thank you for your purchase. Your subscription has been activated and you now have access to all premium features.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg bg-muted/50 p-4">
                                <p className="text-sm text-muted-foreground">
                                    You can now access your dashboard and start using all the features available in your plan.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button asChild className="w-full">
                                    <Link href={dashboard().url}>
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/">
                                        Return to Home
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
