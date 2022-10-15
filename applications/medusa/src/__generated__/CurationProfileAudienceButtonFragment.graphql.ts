/**
 * @generated SignedSource<<967ef612a32b32c95ad7a7efe2af5951>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileAudienceButtonFragment$data = {
  readonly audiences: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "CurationProfileAudienceButtonFragment";
};
export type CurationProfileAudienceButtonFragment$key = {
  readonly " $data"?: CurationProfileAudienceButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileAudienceButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationProfileAudienceButtonFragment",
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

(node as any).hash = "5daa678a36655e74c48695233bf1d755";

export default node;
