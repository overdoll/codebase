/**
 * @generated SignedSource<<f98b9902063a696f089e2d62f01ea06c>>
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
    readonly canSupport: boolean;
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "canSupport",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c2f952960882b21c8f0aca97575c4fb6";

export default node;
