import { useState, useEffect, useActionState, startTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose, // Import DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import type { PostgrestError } from '@supabase/supabase-js'; // Import the specific error type if known
import { deleteProduct } from '@/utils/actions/products';

interface DeleteProductDialogProps {
    productId: string;
    children: React.ReactNode; // To wrap the trigger element
}

// Define the expected state shape from the server action
interface ActionState {
    success?: boolean;
    error?: string; // Error should be a string for display
    message?: string; // Optional success message
}

const initialState: ActionState = {};

export function DeleteProductDialog({ productId, children }: DeleteProductDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    // Wrap the action with useActionState
    const [state, formAction, isPending] = useActionState(
        deleteProduct,
        null
    );



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the product.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}> 
                    <input type="hidden" name="productId" value={productId} />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isPending}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive" disabled={isPending}>
                            {isPending ? <LoaderCircle className="animate-spin mr-2" size={16} /> : null}
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}