/**
 * @generated SignedSource<<eba09b1a8c28127a63acdd54c66f1592>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubRedirectSupportWrapperFragment$data = {
  readonly canSupport: boolean;
  readonly slug: string;
  readonly " $fragmentType": "ClubRedirectSupportWrapperFragment";
};
export type ClubRedirectSupportWrapperFragment$key = {
  readonly " $data"?: ClubRedirectSupportWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubRedirectSupportWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubRedirectSupportWrapperFragment",
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
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a53515a2ea13f20273d6eab2664f0853";

export default node;
