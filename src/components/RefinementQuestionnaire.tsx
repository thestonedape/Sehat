import { useState } from "react";
import { ChevronDown, ChevronUp, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface MedicalInfo {
  age?: string;
  gender?: string;
  region?: string;
  duration?: string;
  symptoms?: string;
  pastMedicalHistory?: string;
  medications?: string;
  allergies?: string;
  familyHistory?: string;
}

interface RefinementQuestionnaireProps {
  onSave: (info: MedicalInfo) => void;
  initialData?: MedicalInfo;
}

const RefinementQuestionnaire = ({ onSave, initialData }: RefinementQuestionnaireProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<MedicalInfo>(initialData || {});

  const handleChange = (field: keyof MedicalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsExpanded(false);
  };

  const hasAnyData = Object.values(formData).some(val => val && val.trim() !== '');

  return (
    <Card className="w-full border-blue-200 bg-blue-50/50">
      <CardHeader 
        className="cursor-pointer hover:bg-blue-100/50 transition-colors rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              📋 Refine Your Diagnosis
              {hasAnyData && !isExpanded && (
                <span className="text-xs font-normal text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  ✓ Information Added
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Optional: Add medical details for better diagnostic analysis
            </CardDescription>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 25"
                value={formData.age || ''}
                onChange={(e) => handleChange('age', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender || ''} onValueChange={(val) => handleChange('gender', val)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Geographic Location</Label>
              <Input
                id="region"
                placeholder="e.g., California, USA"
                value={formData.region || ''}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">How long have you had this condition?</Label>
              <Input
                id="duration"
                placeholder="e.g., 2 weeks, 3 months"
                value={formData.duration || ''}
                onChange={(e) => handleChange('duration', e.target.value)}
              />
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Current Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms (e.g., itching, pain, redness, scaling)"
                value={formData.symptoms || ''}
                onChange={(e) => handleChange('symptoms', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pastMedicalHistory">Past Medical History</Label>
              <Textarea
                id="pastMedicalHistory"
                placeholder="Any relevant medical conditions (e.g., diabetes, autoimmune disorders)"
                value={formData.pastMedicalHistory || ''}
                onChange={(e) => handleChange('pastMedicalHistory', e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                placeholder="List any medications you're currently taking"
                value={formData.medications || ''}
                onChange={(e) => handleChange('medications', e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Input
                id="allergies"
                placeholder="Any known allergies (medications, food, environment)"
                value={formData.allergies || ''}
                onChange={(e) => handleChange('allergies', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyHistory">Family History</Label>
              <Textarea
                id="familyHistory"
                placeholder="Any relevant family medical history related to skin conditions"
                value={formData.familyHistory || ''}
                onChange={(e) => handleChange('familyHistory', e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save size={16} className="mr-2" />
              Save Information
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(false)}
              className="px-6"
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            💡 This information helps provide more context but is completely optional
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default RefinementQuestionnaire;
