/**
 * @generated SignedSource<<91a91cb7fde6e74ec797dd1c16c09755>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationStepperFooterFragment$data = {
  readonly audience: {
    readonly " $fragmentSpreads": FragmentRefs<"CurationAudienceNextButtonFragment">;
  };
  readonly category: {
    readonly " $fragmentSpreads": FragmentRefs<"CurationCategoryNextButtonFragment">;
  };
  readonly dateOfBirth: {
    readonly " $fragmentSpreads": FragmentRefs<"CurationDateOfBirthNextButtonFragment">;
  };
  readonly " $fragmentType": "CurationStepperFooterFragment";
};
export type CurationStepperFooterFragment$key = {
  readonly " $data"?: CurationStepperFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationStepperFooterFragment">;
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

(node as any).hash = "27e34d5548985b469aa77f2695696b37";

export default node;
