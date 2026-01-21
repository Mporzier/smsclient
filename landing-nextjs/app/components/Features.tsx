"use client";
import AICard from "./features/AICard";
import GroupingCard from "./features/GroupingCard";
import ImportCard from "./features/ImportCard";
import SchedulingCard from "./features/SchedulingCard";
import CleanupCard from "./features/CleanupCard";
import RentabilityCard from "./features/RentabilityCard";

export default function Features() {
    return (
        <section id="features" className="py-24 px-4 relative overflow-hidden w-full max-w-3xl mx-auto">
            <AICard />
            <GroupingCard />
            <ImportCard />
            <SchedulingCard />
            <CleanupCard />
            <RentabilityCard />
        </section>
    );
}