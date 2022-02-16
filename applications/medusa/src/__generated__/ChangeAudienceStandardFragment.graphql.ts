/**
 * @generated SignedSource<<d93eb31c17de278f130416dc5f9508bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceStandardFragment$data = {
  readonly id: string;
  readonly standard: boolean;
  readonly " $fragmentType": "ChangeAudienceStandardFragment";
};
export type ChangeAudienceStandardFragment = ChangeAudienceStandardFragment$data;
export type ChangeAudienceStandardFragment$key = {
  readonly " $data"?: ChangeAudienceStandardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceStandardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceStandardFragment",
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
      "name": "standard",
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "4e63825c1d01b385b938c5022c0923b8";

export default node;
