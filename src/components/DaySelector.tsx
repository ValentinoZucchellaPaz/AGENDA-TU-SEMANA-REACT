"use client"
import { weekDays } from "@/lib/formValidations";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";

interface DaySelectorProps {
    selectedDays: string[];
    onChange: (days: string[]) => void;
}

function DaySelector({ selectedDays, onChange }: DaySelectorProps) {
    const [showDays, setShowDays] = useState(true);

    const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        let newState: string[];

        // separo logica para agregar un dia y para eliminar un dia
        if (checked) {
            newState = [...selectedDays, name];

            if (name === "Todos") {
                onChange(weekDays);
                return;
            } else if (weekDays.slice(0, -1).every((weekDay) => newState.includes(weekDay))) {
                onChange(weekDays);
                return;
            } else {
                onChange(newState);
            }
        } else {
            newState = selectedDays.filter((day) => day !== name);

            if (name === "Todos") {
                onChange([]);
                return;
            } else if (selectedDays.length === 8) {
                onChange(newState.filter((day) => day !== "Todos"));
                return;
            } else {
                onChange(newState);
            }
        }
    }, [selectedDays, onChange]);

    return (
        <div className="w-full sm:w-[80%] lg:w-96">
            <Label>Días:</Label>
            <Button type="button" className="ml-2" size="icon" variant="ghost" onClick={() => setShowDays((prev) => !prev)}>
                <ChevronDownIcon className={`transition-all ${showDays ? "rotate-180" : "rotate-0"}`} />
            </Button>
            {showDays && (
                <ul className="flex flex-wrap justify-start">
                    {weekDays.map((day) => {
                        const randomKey = crypto.randomUUID()
                        return (
                            <li key={`li-checkbox-${day}-${randomKey}`}>
                                <Label htmlFor={`checkbox-${day}-${randomKey}`} className="hover:cursor-pointer flex items-center gap-2 m-3">
                                    <input
                                        type="checkbox"
                                        name={day}
                                        id={`checkbox-${day}-${randomKey}`}
                                        onChange={handleCheckboxChange}
                                        checked={selectedDays.includes(day)}
                                        className="hover:cursor-pointer"
                                    />
                                    <span>
                                        {day}
                                    </span>
                                </Label>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}

export default memo(DaySelector)