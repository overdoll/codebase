/**
 * @generated SignedSource<<1ecab0f17621a772718058e94dbb30d0>>
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
    readonly id: string;
    readonly username: string;
    readonly avatar: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentType": "PostHeaderContributorFragment";
};
export type PostHeaderContributorFragment = PostHeaderContributorFragment$data;
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
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "avatar",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c0f4fad9e448e59036f01320d785c43b";

export default node;
