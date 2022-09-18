/**
 * @generated SignedSource<<c57ee871c07526dbbf17eb9f1ca7a4ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewHeaderFragment$data = {
  readonly club: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  };
  readonly description: string;
  readonly " $fragmentType": "PreviewHeaderFragment";
};
export type PreviewHeaderFragment$key = {
  readonly " $data"?: PreviewHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "0131afc7c10656c9ebcc52cb4910c5f3";

export default node;
