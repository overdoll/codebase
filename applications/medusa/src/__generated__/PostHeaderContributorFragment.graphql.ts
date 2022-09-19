/**
 * @generated SignedSource<<35255683ee87b97502d8a9f13d51a027>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderContributorFragment$data = {
  readonly contributor: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  };
  readonly " $fragmentType": "PostHeaderContributorFragment";
};
export type PostHeaderContributorFragment$key = {
  readonly " $data"?: PostHeaderContributorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderContributorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderContributorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "133f661dbb2020160d7cbe6cc3f70c12";

export default node;
