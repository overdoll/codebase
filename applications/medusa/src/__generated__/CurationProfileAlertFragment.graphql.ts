/**
 * @generated SignedSource<<2e5e9d36b5f24a4b67e3b9a3149d63c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileAlertFragment$data = {
  readonly __typename: "Account";
  readonly curationProfile: {
    readonly completed: boolean;
  };
  readonly " $fragmentType": "CurationProfileAlertFragment";
};
export type CurationProfileAlertFragment$key = {
  readonly " $data"?: CurationProfileAlertFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileAlertFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationProfileAlertFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "completed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fb377850a122302a10a58dbd32a64f4a";

export default node;
