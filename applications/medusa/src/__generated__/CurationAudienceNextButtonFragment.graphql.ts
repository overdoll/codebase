/**
 * @generated SignedSource<<9ed37287d8e7b6f41d27ebae095a0be6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationAudienceNextButtonFragment$data = {
  readonly audiences: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "CurationAudienceNextButtonFragment";
};
export type CurationAudienceNextButtonFragment = CurationAudienceNextButtonFragment$data;
export type CurationAudienceNextButtonFragment$key = {
  readonly " $data"?: CurationAudienceNextButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationAudienceNextButtonFragment">;
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

(node as any).hash = "478226dd45ad3b9a96f11bef046ae5b0";

export default node;
