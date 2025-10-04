'use client';

import { useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight } from 'lucide-react';
import UserPagesNavbar from '@/components/layout/UserPagesNavbar';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface DashboardProject {
    projectName: string;
    projectDescription: string;
    lastModifiedDate: {
        seconds: number;
        nanoseconds: number;
    };
    thumbnailUrl: string;
}

function ProjectCard({ project }: { project: { id: string } & DashboardProject }) {
    const lastModified = project.lastModifiedDate ? format(new Date(project.lastModifiedDate.seconds * 1000), 'MMM d, yyyy') : 'N/A';
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="line-clamp-2">{project.projectName}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">Last updated: {lastModified}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3">{project.projectDescription}</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                    <Link href={`/studio?projectId=${project.id}`}>
                        Open Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

function ProjectSkeleton() {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}

export default function ProjectsPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const projectsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, 'users', user.uid, 'websiteProjects'),
            orderBy('lastModifiedDate', 'desc')
        );
    }, [user, firestore]);

    const { data: projects, isLoading } = useCollection<DashboardProject>(projectsQuery);

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <UserPagesNavbar />
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-headline font-bold">My Projects</h1>
                            <p className="text-muted-foreground">
                                Here are the websites you've created.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/studio">
                                <PlusCircle className="mr-2 h-4 w-4" /> New Project
                            </Link>
                        </Button>
                    </div>

                    {isLoading && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => <ProjectSkeleton key={i} />)}
                         </div>
                    )}
                    
                    {!isLoading && projects && projects.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}

                    {!isLoading && (!projects || projects.length === 0) && (
                        <div className="text-center py-20 border-2 border-dashed rounded-lg">
                            <h2 className="text-xl font-semibold">No projects yet!</h2>
                            <p className="text-muted-foreground mt-2">
                                Start creating your first website by clicking the button below.
                            </p>
                            <Button asChild className="mt-6">
                                <Link href="/studio">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Start a New Project
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
