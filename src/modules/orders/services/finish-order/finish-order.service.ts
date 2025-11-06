import { Injectable } from '@nestjs/common';

interface IFinishOrderProps {
    status: "CANCELED" | "FINISHED"
    order_id: string;
}

@Injectable()
export class FinishOrderService {
    public async execute(data_order: IFinishOrderProps) {}

    private async cancelOrder() {}

    private async finishOrder() {}
}
