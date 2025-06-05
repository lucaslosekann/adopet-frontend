import { toast } from 'sonner';

type ToastMessageProps = {
    title: string;
    description?: string;
};

export default function ToastMessage({ title, description }: ToastMessageProps) {
    return (
        <div>
            <div className="text-red-600 font-semibold">{title}</div>
            {description && <div className="text-sm text-gray-600">description</div>}
        </div>
    );
}
