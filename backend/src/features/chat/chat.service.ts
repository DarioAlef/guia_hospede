import { PropertyService } from "../property/index.js";
import { GuidebookRepository } from "../guidebook/guidebook.repository.js";
import type { PropertyResponse } from "../property/index.js";
import type { GuidebookContent } from "../../shared/dtos/guidebook.dto.js";

export interface ChatContext {
  property: PropertyResponse;
  guidebook: GuidebookContent | null;
}

export class ChatService {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly guidebookRepository: GuidebookRepository
  ) {}

  async loadChatContext(code: string): Promise<ChatContext> {
    const property = await this.propertyService.getByCode(code);
    const guidebookRecord =
      await this.guidebookRepository.findByPropertyCode(code);

    const guidebook: GuidebookContent | null = guidebookRecord
      ? {
          restaurants:
            guidebookRecord.restaurants as GuidebookContent["restaurants"],
          attractions:
            guidebookRecord.attractions as GuidebookContent["attractions"],
          essentialServices:
            guidebookRecord.essentialServices as GuidebookContent["essentialServices"],
          seasonalTip: guidebookRecord.seasonalTip,
          welcomeMessage: guidebookRecord.welcomeMessage,
        }
      : null;

    return { property, guidebook };
  }
}
