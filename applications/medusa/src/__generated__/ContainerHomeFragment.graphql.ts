/**
 * @generated SignedSource<<2c9a052ec0d86760b09d1db59d25e2be>>
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
    readonly " $fragmentSpreads": FragmentRefs<"SecondaryBoxesHomeFragment" | "UrlCurationProfileFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SecondarySuggestedHomeFragment" | "SuggestedHomeFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SecondarySuggestedHomeFragment"
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
          "name": "SecondaryBoxesHomeFragment"
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

(node as any).hash = "2032c801d1b0a318a69fa9f5d9be8bb1";

export default node;
