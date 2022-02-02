/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurationStepperFooterFragment = {
    readonly dateOfBirth: {
        readonly " $fragmentRefs": FragmentRefs<"CurationDateOfBirthNextButtonFragment">;
    };
    readonly audience: {
        readonly " $fragmentRefs": FragmentRefs<"CurationAudienceNextButtonFragment">;
    };
    readonly category: {
        readonly " $fragmentRefs": FragmentRefs<"CurationCategoryNextButtonFragment">;
    };
    readonly " $refType": "CurationStepperFooterFragment";
};
export type CurationStepperFooterFragment$data = CurationStepperFooterFragment;
export type CurationStepperFooterFragment$key = {
    readonly " $data"?: CurationStepperFooterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CurationStepperFooterFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationStepperFooterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DateOfBirthCurationProfile",
      "kind": "LinkedField",
      "name": "dateOfBirth",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CurationDateOfBirthNextButtonFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AudienceCurationProfile",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CurationAudienceNextButtonFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryCurationProfile",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CurationCategoryNextButtonFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CurationProfile",
  "abstractKey": null
};
(node as any).hash = '27e34d5548985b469aa77f2695696b37';
export default node;
