/**
 * @generated SignedSource<<b6aba8247b2b6a1500a97e2a944eeca8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterLockedContentFragment$data = {
  readonly supporterOnlyVideoMediaDuration: number | null;
  readonly " $fragmentType": "SupporterLockedContentFragment";
};
export type SupporterLockedContentFragment$key = {
  readonly " $data"?: SupporterLockedContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterLockedContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterLockedContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "supporterOnlyVideoMediaDuration",
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "4b1325dc3a4e6631803980159373fa4d";

export default node;
