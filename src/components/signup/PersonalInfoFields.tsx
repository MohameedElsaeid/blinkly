import {User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface PersonalInfoFieldsProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
}

export const PersonalInfoFields = ({
                                       firstName,
                                       setFirstName,
                                       lastName,
                                       setLastName
                                   }: PersonalInfoFieldsProps) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10"
                        autoComplete="given-name"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10"
                        autoComplete="family-name"
                        required
                    />
                </div>
            </div>
        </div>
    );
};
