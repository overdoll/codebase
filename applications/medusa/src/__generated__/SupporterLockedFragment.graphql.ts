/**
 * @generated SignedSource<<0f379c91dbdb1d5ade0430b136ba06d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterLockedFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentType": "SupporterLockedFragment";
};
export type SupporterLockedFragment$key = {
  readonly " $data"?: SupporterLockedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterLockedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterLockedFragment",
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
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f13d115094cfa5dea7524cad0e420a1a";

export default node;
