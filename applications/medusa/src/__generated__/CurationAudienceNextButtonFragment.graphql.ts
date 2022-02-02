/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurationAudienceNextButtonFragment = {
    readonly audiences: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "CurationAudienceNextButtonFragment";
};
export type CurationAudienceNextButtonFragment$data = CurationAudienceNextButtonFragment;
export type CurationAudienceNextButtonFragment$key = {
    readonly " $data"?: CurationAudienceNextButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CurationAudienceNextButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationAudienceNextButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audiences",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AudienceCurationProfile",
  "abstractKey": null
};
(node as any).hash = '478226dd45ad3b9a96f11bef046ae5b0';
export default node;
