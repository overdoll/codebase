/**
 * @generated SignedSource<<c57328631a744ffbdaf0a9bba9baf59b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerHomeFragment$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"BoxesHomeFragment" | "UrlCurationProfileFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedHomeFragment">;
  readonly " $fragmentType": "ContainerHomeFragment";
};
export type ContainerHomeFragment$key = {
  readonly " $data"?: ContainerHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuggestedHomeFragment"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BoxesHomeFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UrlCurationProfileFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "57fe610bb3312c764d52a3aed575fef3";

export default node;
